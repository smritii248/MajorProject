# ============================================
# Bagmati River Textile Waste — Extra Contribution Analysis
# Estimates textile waste reaching the Bagmati River system, and
# connects it to EcoThread's potential diversion impact.
#
# Sources:
# - Kathmandu Valley total solid waste: Nepali Times, "Kathmandu's toxic trash"
# - River leakage rate: Earth.org, "How Did the Holy Bagmati Become Nepal's
#   Most Polluted River?"
# - Textile fraction of municipal solid waste: assumed, no Nepal-specific
#   study exists (explicitly flagged as a gap in Section 1.1 of the proposal)
# ============================================

# --- Baseline city-wide figures ---
TOTAL_DAILY_WASTE_TONNES = 1200        # Kathmandu Valley, solid waste/day
RIVER_LEAKAGE_RATE = 0.25              # ~25% of roadside/riverbank dumped waste reaches waterways

# --- Assumption: textile share of municipal solid waste ---
# No Nepal-specific figure exists. International studies commonly estimate
# textiles at roughly 2-5% of municipal solid waste. We use the midpoint.
TEXTILE_FRACTION_LOW = 0.02
TEXTILE_FRACTION_MID = 0.035
TEXTILE_FRACTION_HIGH = 0.05


def estimate_textile_waste_to_river(textile_fraction):
    daily_textile_waste = TOTAL_DAILY_WASTE_TONNES * textile_fraction
    daily_to_river = daily_textile_waste * RIVER_LEAKAGE_RATE
    annual_to_river = daily_to_river * 365
    return {
        "daily_textile_waste_tonnes": round(daily_textile_waste, 2),
        "daily_to_river_tonnes": round(daily_to_river, 2),
        "annual_to_river_tonnes": round(annual_to_river, 1),
    }


def estimate_ecothread_diversion(annual_to_river_tonnes, diversion_rate):
    """
    diversion_rate: fraction of the estimated textile waste stream EcoThread
    could plausibly divert through reuse, if adopted at a given scale.
    """
    diverted = annual_to_river_tonnes * diversion_rate
    return round(diverted, 2)


if __name__ == "__main__":
    print("=== Bagmati River Textile Waste — Estimated Range ===\n")

    for label, fraction in [
        ("Low estimate (2%)", TEXTILE_FRACTION_LOW),
        ("Mid estimate (3.5%)", TEXTILE_FRACTION_MID),
        ("High estimate (5%)", TEXTILE_FRACTION_HIGH),
    ]:
        result = estimate_textile_waste_to_river(fraction)
        print(f"{label}:")
        print(f"  Daily textile waste (city-wide): {result['daily_textile_waste_tonnes']} tonnes")
        print(f"  Daily textile waste reaching Bagmati: {result['daily_to_river_tonnes']} tonnes")
        print(f"  Annual textile waste reaching Bagmati: {result['annual_to_river_tonnes']} tonnes\n")

    print("=== EcoThread Potential Diversion (using mid estimate) ===\n")
    mid_annual = estimate_textile_waste_to_river(TEXTILE_FRACTION_MID)["annual_to_river_tonnes"]

    for label, rate in [("Conservative adoption (1%)", 0.01), ("Moderate adoption (5%)", 0.05)]:
        diverted = estimate_ecothread_diversion(mid_annual, rate)
        print(f"{label}: ~{diverted} tonnes/year potentially diverted from the Bagmati")