export class Allergies {
    allergen: Allergen;
    severity: Severity;
    comment: string;
    reactions: Reactions[];

}

export class Allergen {
    allergenType: string;
    codedAllergen: CodedAllergen;
}

export class CodedAllergen {
    uuid: string;
}

export class Severity {
    uuid: string;
}

export class Reactions {
    reaction: Reaction;
}

export class Reaction {
    uuid: string;
}
