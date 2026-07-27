# ============================================
# EcoThread Environmental Impact Module
# Produces the environmental impact section of the Garment Report
# (matches Table 3.3 and Figure 4.2 in the proposal)
# Source: Thomas, Fishwick, Joyce & van Santen (2012), WRAP Table 21 (CO2)
#         Ethical Consumer / Textiles School (water)
# ============================================

emission_factors = {  # kg CO2e per kg fabric
    "cotton":    8.3,
    "polyester": 6.4,
    "nylon":     7.31,
    "wool":      13.89,
    "silk":      7.63,
    "linen":     4.5,
    "acrylic":   11.53,
}

water_factors = {  # liters per kg fabric
    "cotton":    10000,
    "polyester": 20,
    "wool":      500,
    "linen":     1000,
}

waste_factors = {  # kg of textile waste diverted per kg garment, by condition grade
    "Reusable":   0.9,
    "Repairable": 0.6,
    "Recycle":    0.1,
}

GARMENT_WEIGHTS = {  # kg
    "shirt": 0.2,
    "jacket": 0.7,
    "trousers": 0.4,
    "dress": 0.3,
}

REUSE_PROBABILITY = {
    "Reusable": 1.0,
    "Repairable": 0.6,
    "Recycle": 0.1,
}


def calculate_impact(garment_type, fabric_type, condition_grade):
    weight = GARMENT_WEIGHTS.get(garment_type, 0.3)
    co2_factor = emission_factors.get(fabric_type, emission_factors["cotton"])
    water_factor = water_factors.get(fabric_type, water_factors["cotton"])
    reuse_factor = REUSE_PROBABILITY[condition_grade]

    return {
        "co2_saved_kg": round(weight * co2_factor * reuse_factor, 2),
        "water_saved_l": round(weight * water_factor * reuse_factor, 1),
        "waste_diverted_kg": round(weight * waste_factors[condition_grade], 2),
    }


def generate_report(garment_type, fabric_type, condition_grade, detected_defects=None):
    """
    Produces the full structured output per Table 3.3.
    detected_defects: list of strings, e.g. ["Minor fading"]
    """
    impact = calculate_impact(garment_type, fabric_type, condition_grade)

    action_map = {
        "Reusable": "Sell",
        "Repairable": " Donate",
        "Recycle": "Recycle",
    }

    return {
        "garment_type": garment_type.capitalize(),
        "fabric_type": fabric_type.capitalize(),
        "condition_grade": condition_grade,
        "detected_defects": detected_defects or ["None detected"],
        "environmental_impact": impact,
        "recommended_action": action_map[condition_grade],
    }


# testing
if __name__ == "__main__":
    report = generate_report(
        garment_type="jacket",
        fabric_type="cotton",
        condition_grade="Reusable",
        detected_defects=["Minor fading"]
    )

    print("=== EcoThread Garment Report ===")
    for key, value in report.items():
        print(f"{key}: {value}")


#  The Environmental Impact Module — one of the core components in proposal (Section 3.1.1, Fig 3.1: "Environmental score — CO2, water, waste saved"; and Section 3.2's Methodology step "Environmental Impact Module").
#  This is the piece of EcoThread that answers the question: "if this garment gets reused instead of thrown away, what does that actually save?"

# Concretely, calculate_impact() takes three inputs — garment type, fabric type, condition grade — and returns two numbers: kg of CO2 saved, and liters of water saved.
# The emission_factors dict holds The real correct and scored values from actual Table 21 figures (cotton = 8.3 kg CO2e/kg, wool = 13.89, etc.) from real citations. 
# The core formula shape — emission_factors[fabric] * weight_kg, plus a separate water_factors dict since water figures come from a different source than CO2 figures.
#  That two-dict structure, and the explicit note that water and CO2 are sourced separately, both came directly from her framing.