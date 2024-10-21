/**
 * A Mapping of the output classes for ResNet50 and SqueezeNet.
 */
var skinClassifications = {
    '0': 'acne',
    '1': 'basal',
    '2': 'eczema',
    '3': 'melanoma or mole',
    '4': 'monkey pox'
};
var quest = {
    'acne': {
        "q1": ['o1', 'o2'],
        "q2": ['o1', 'o2']
    },
    'eczema': {
        "q1": ['o1', 'o2'],
        "q2": ['o1', 'o2']
    },
    'melanoma or mole': {
        "q1": ['o1', 'o2'],
        "q2": ['o1', 'o2']
    },
    'psoriasis': {
        "q1": ['o1', 'o2'],
        "q2": ['o1', 'o2']
    }
};

var responses = {
    'acne':{
        "q1" : {
            'o1': 'r1',
            'o2': 'r2'
        },
        "q2" : {
            'o1': 'r1',
            'o2': 'r2'
        }
    },
    'eczema':{
        "q1" : {
            'o1': 'r1',
            'o2': 'r2'
        },
        "q2" : {
            'o1': 'r1',
            'o2': 'r2'
        }
    },
    'melanoma or mole':{
        "q1" : {
            'o1': 'r1',
            'o2': 'r2'
        },
        "q2" : {
            'o1': 'r1',
            'o2': 'r2'
        }
    },
    'psoriasis':{
        "q1" : {
            'o1': 'r1',
            'o2': 'r2'
        },
        "q2" : {
            'o1': 'r1',
            'o2': 'r2'
        }
    }
}
// sourceMappingURL=imagenet.js.map