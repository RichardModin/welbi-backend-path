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


# Improvements

Due to the static nature of the database, I didn't find the need in this example to add any date validation to the programs. However, in a real-world scenario, date validation would definitely need to be implemented to ensure that the only future programs are recommended, and possibly only programs within a certain date range. I'm not sure how far in the future programs are booked.<br>
I would also want to ensure that the data points and weights being used are representative of how programs actually work and ensure that the weighting is appropriate. I would also want to expand on the value each weight and create a more robust way of adjusting them. Possibly even creating another tool to allow for users to adjust these weights at any time.<br>
In this particular implementation, I am not using the actual hobbies of the resident. I would want to implement the using of the resident's hobbies to recommend programs at a greater weight value. Again, with the possibility to adjust these weights with a custom tool. <br>
There is also adding unit tests to ensure that everything has the appropriate coverage and is working as expected. The possibility of adding more code documentation and comments to ensure that the code is easily understood and maintained. <br>
I would also want to add more error and edge case handling to ensure that the system is robust and can handle any unexpected issues. For example, if the resident has not attended any programs, what should the system do? <br>
There is also the possibility of adding some logging to document the system's behavior and to help with debugging and monitoring. <br>
Loads of things that can be done, it's just a matter of time and resources and what is most important to the business. <br>

## Other ideas and thoughts

I have had ideas about using the preferences dictionary as a look-up table or a cache to store the resident's preferences. This would allow for a possible historic look-up of the resident's preferences to see how their preferences are changing as they attend new programs. <br>
I have also had thoughts about possibly conducting satisfaction surveys after programs have been attended and comparing the results of said surveys to the resident's preferences dictionary to validate whether the resident's preferences are being met. <br>
I think the biggest hurdle I am experiencing is the lack of industry and domain knowledge. I am unsure of exactly how each data point is represented in the real world and what they mean in the context of a resident's daily life and how they relate with programs and facilities. I am certain that some of these data points could be represented as a boolean rather than a weight.<br>

## Improving data points and resident data

I have had several ideas about other resident data and information that could improve the accuracy of the recommendation system. <br>

- **Friends** - Documenting a residents friends. What are they attending in the future? What have their friends attended in the past? Do they prefer to attend programs with people they know or their friends? Do they enjoy programs with strangers and making new friends?
- **Adventurous** - Is the resident adventurous and willing to try new things or do they prefer to stick to the same types programs they have attended in the past?
- **Gender** - I usually don’t subscribe to gender-affirming roles and things of that nature, but I do wonder if there are programs that are more catered to certain genders.
- **Age** - Are there events that are specific to certain generations of residents? Is the resident interested in a specific decade or period in history that the program contains?
- **Geography** - Is the program related, pertaining to or from a specific or unique geographic location? Does the resident have heritage from said locale, or do they want to avoid certain locales?
- **Cultural and Historical Relationships** - Are there events that are related to the history, culture, or upbringing for the resident?
- **Active level** - iI the resident more active and willing to do programs that are more physically demanding? IE. sports or other physical activities?
- **Socialite**, Does the resident prefer more quiet, smaller groups or do they like large groups of people? Programs with smaller or larger attendance?
- **Schedules**, Are there programs in the morning, afternoon, evening that they prefer or are not able to attend?
- **Triggers**, Are there certain things that they cannot, full stop, participate in. Regardless of all the other metrics is there any past trauma or negative experiences that they need to avoid?
- **Health Concerns**, Are they diabetic, do they have allergies, are there any other ailments that the resident needs to avoid? Very similar to triggers but more in a more health-related context.
- **Cognition**, Is the resident able to participate in programs that require deep levels of thought or should they avoid programs that are complex and thought-provoking?