/**
 * A Mapping of the output classes for ResNet50 and SqueezeNet.
 */
var skinClassifications = {
    '0': 'Acne',
    '1': 'Basal',
    '2': 'Eczema',
    '3': 'Hives',
    '4': 'Melanoma or Mole',
    '5': 'Monkey Pox',
    '6': 'Healthy'
  };
var quest = {
    'acne/eczema': {
        "How does you skin feel": ['Oily and Greasy', 'Dry and Flaky'],
        "What type of bumps do you experience?": ['Pimples with pus or blackheads', 'Itchy red patches or blisters'],
        "Where do the bumps mostly appear?": ['Face, chest, or back', 'Elbows, knees, or hands'],
        "How often do you experience flare-ups?": ['Mostly during teenage years or hormonal changes', 'At any age, often triggered by weather or allergens'],
        "How does your skin react to moisturizers?": ['Makes my skin more oily or causes breakouts', 'Helps soothe dryness or irritation'],
        
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
    'acne/eczema':{
        "0" : {
            '0': '1',
            '1': '2'
        },
        "1" : {
            '0': '1',
            '1': '2'
        },
        "2" : {
            '0': '1',
            '1': '2'
        },
        "3" : {
            '0': '1',
            '1': '2'
        },
        "4" : {
            '0': '1',
            '1': '2'
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