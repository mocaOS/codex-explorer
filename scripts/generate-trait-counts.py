#!/usr/bin/env python3
"""
Generate trait counts from MOCA Codex API

This script fetches all Art DeCC0 tokens from the API and generates
a JSON file with occurrence counts for each trait value in all filter categories.

Usage:
    python scripts/generate-trait-counts.py

Output:
    assets/data/trait-counts.json
"""

import requests
import json
from collections import defaultdict
from pathlib import Path

# API configuration
API_BASE_URL = "https://api.decc0s.com"
ENDPOINT = "/items/codex"

# Field mappings: JSON key -> API field name
FIELD_MAPPINGS = {
    "backgrounds": "background_category",
    "backgroundTextures": "background_texture",
    "characters": "decc0_type",  # Will be merged with Alien/Ape from background_category
    "moods": "mood",
    "dnaLineages": "dna1",
    "dnaMemetics": "dna2",
    "dnaArtistSelfPortraits": "dna3",
    "dnaMOCACollections": "dna4"
}

def fetch_all_tokens():
    """Fetch all tokens from the API"""
    print("Fetching all Art DeCC0 tokens from API...")
    
    params = {
        "limit": 10000,
        "offset": 0,
        "fields": ",".join(FIELD_MAPPINGS.values()),
        "sort": "id"
    }
    
    try:
        response = requests.get(f"{API_BASE_URL}{ENDPOINT}", params=params)
        response.raise_for_status()
        data = response.json()
        
        tokens = data.get("data", [])
        print(f"✓ Fetched {len(tokens)} tokens")
        return tokens
    
    except requests.exceptions.RequestException as e:
        print(f"✗ Error fetching data: {e}")
        return []

def count_trait_occurrences(tokens):
    """Count occurrences of each trait value"""
    print("\nCounting trait occurrences...")
    
    # Initialize counters
    counts = {
        "backgrounds": defaultdict(int),
        "backgroundTextures": defaultdict(int),
        "characters": defaultdict(int),
        "moods": defaultdict(int),
        "dnaLineages": defaultdict(int),
        "dnaMemetics": defaultdict(int),
        "dnaArtistSelfPortraits": defaultdict(int),
        "dnaMOCACollections": defaultdict(int)
    }
    
    for token in tokens:
        # Handle backgrounds
        bg_value = token.get("background_category")
        if bg_value:
            # Special case: Alien and Ape go to characters, not backgrounds
            if bg_value in ["Alien", "Ape"]:
                counts["characters"][bg_value] += 1
            else:
                counts["backgrounds"][bg_value] += 1
        
        # Handle background textures
        texture_value = token.get("background_texture")
        if texture_value:
            counts["backgroundTextures"][texture_value] += 1
        
        # Handle characters (decc0_type)
        char_value = token.get("decc0_type")
        if char_value:
            counts["characters"][char_value] += 1
        
        # Handle moods
        mood_value = token.get("mood")
        if mood_value:
            counts["moods"][mood_value] += 1
        
        # Handle DNA lineages
        dna1_value = token.get("dna1")
        if dna1_value:
            counts["dnaLineages"][dna1_value] += 1
        
        # Handle DNA memetics
        dna2_value = token.get("dna2")
        if dna2_value:
            counts["dnaMemetics"][dna2_value] += 1
        
        # Handle DNA artist self-portraits
        dna3_value = token.get("dna3")
        if dna3_value:
            counts["dnaArtistSelfPortraits"][dna3_value] += 1
        
        # Handle DNA MOCA collections
        dna4_value = token.get("dna4")
        if dna4_value:
            counts["dnaMOCACollections"][dna4_value] += 1
    
    # Convert defaultdicts to regular dicts and sort by count (descending)
    result = {}
    for category, counter in counts.items():
        # Sort by count descending, then by name ascending
        sorted_items = sorted(
            counter.items(),
            key=lambda x: (-x[1], x[0])
        )
        result[category] = dict(sorted_items)
        
        # Print summary
        total = sum(counter.values())
        unique = len(counter)
        print(f"  {category}: {unique} unique values, {total} total occurrences")
    
    return result

def save_trait_counts(counts):
    """Save trait counts to JSON file"""
    output_path = Path(__file__).parent.parent / "assets" / "data" / "trait-counts.json"
    output_path.parent.mkdir(parents=True, exist_ok=True)
    
    print(f"\nSaving to {output_path}...")
    
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(counts, f, indent=2, ensure_ascii=False)
    
    print("✓ Trait counts saved successfully!")
    print(f"\nFile location: {output_path}")

def print_summary(counts):
    """Print a summary of the rarest traits"""
    print("\n" + "="*60)
    print("RAREST TRAITS (Top 5 per category)")
    print("="*60)
    
    for category, traits in counts.items():
        print(f"\n{category}:")
        # Get bottom 5 by count
        sorted_traits = sorted(traits.items(), key=lambda x: x[1])[:5]
        for trait, count in sorted_traits:
            percentage = (count / 10000) * 100
            print(f"  • {trait}: {count} ({percentage:.2f}%)")

def main():
    """Main execution"""
    print("="*60)
    print("MOCA Codex Trait Count Generator")
    print("="*60)
    
    # Fetch data
    tokens = fetch_all_tokens()
    
    if not tokens:
        print("No tokens fetched. Exiting.")
        return
    
    # Count occurrences
    counts = count_trait_occurrences(tokens)
    
    # Save to file
    save_trait_counts(counts)
    
    # Print summary
    print_summary(counts)
    
    print("\n" + "="*60)
    print("Done! You can now use trait-counts.json in your application.")
    print("="*60)

if __name__ == "__main__":
    main()

