# Welbi Backend Path

 This is a portion of the Welbi interview process, the technical challenge to create a simple recommendation system.

### The Challenge

Create a recommendation system that will propose three candidate programs which address something that Darla Blanda, or any resident, would like. <br>
Since this particular resident, Darla Blanda, doesn't have any hobbies directly relating to any programs, the recommendation system should be based on the programs they have attended in the past.

### The Solution

This is a single REST endpoint that will return a list of three programs that are recommended for a given resident. <br>
This loops through the past programs, generates a dictionary of weights representing certain program data points, and then uses those weights to calculate and recommend programs that the resident has not attended.  <br>
The URL is `/api/residents/{name}`. This is a GET request that takes the resident's name as a path parameter.

### The Inner Workings

This uses two primary helper methods to first get the resident's preferences from previous programs they have attended, allocate a weight to certain data points and then uses that weight to calculate and recommend programs that the resident has not attended.

### Helper Methods

#### getResidentProgramPreferences

This method accepts a list of programs, loops through them and creates a dictionary that represents the accumulated weight for each data point of the resident's program preferences.  <br>
_**This list of programs should always been programs the resident has previously attended._

_Example of the residents preferences dictionary_
```
{
    dimensions: {
        Physical: 36,
        Spiritual: 34,
        ...
    },
    facilitators: {
        Resident: 22,
        'Sales & Marketing': 22,
       ... 
    },
    hobbies: {
        Aerobics: 27,
        Exercise: 31,
        ...
    },
    levelsOfCare: {
        'Assisted Living': 82,
        Independent: 82,
        ...
    }
}
```

#### getResidentRecommendedPrograms

This method accepts a list of programs and the residents program preferences. It loops through the programs and compares the data points of the program to the residents preferences dictionary, calculates a weight for each program data point based on the resident's preferences and creates a total program weight. This total program weight is the metric which represents the similarity between the program and the resident's preferences. The programs are then sorted by this total program weight and the top three programs are returned.

_Example of the programs and their relative weights_
```
[
  {
    id: '04189969-7485-4663-938e-47db68f3df72',
    dimensionsWeight: 14,
    facilitatorsWeight: 54,
    hobbiesWeight: 3,
    levelsOfCareWeight: 43,
    totalWeight: 114
  }, {
    id: '05cfeaaa-636b-4bcd-8670-9ba01496f7d3',
    dimensionsWeight: 19,
    facilitatorsWeight: 54,
    hobbiesWeight: 32,
    levelsOfCareWeight: 23,
    totalWeight: 128
  }, {
    id: '0696ab81-3693-44b8-b7b0-1df36a15c8ef',
    dimensionsWeight: 36,
    facilitatorsWeight: 61,
    hobbiesWeight: 85,
    levelsOfCareWeight: 23,
    totalWeight: 205
  },
  ...
]
```