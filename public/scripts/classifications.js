/**
 * A Mapping of the output classes for ResNet50 and SqueezeNet.
 */
var skinClassifications = {
    '0': 'acne',
    '1': 'eczema',
    '2': 'melanoma or mole',
    '3': 'psoriasis'
};
var quest = {
    'acne': {"q1": ['o1', 'o2'],"q2": ['o1', 'o2']},
    'eczema': {"q1": ['o1', 'o2'],"q2": ['o1', 'o2']},
    'melanoma or mole': {"q1": ['o1', 'o2'],"q2": ['o1', 'o2']},
    'psoriasis': {"q1": ['o1', 'o2'],"q2": ['o1', 'o2']}
};
// sourceMappingURL=imagenet.js.map