import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = `
​​Write a detailed MLS real estate listing description that is at least 175 words and no more than 300 words.
Start with an opening statement that will encourage people to keep reading.
Appeal to the reader's emotions with useful verbs that communicate a strong sense of action.
Use the exact numbers provided for number of bedrooms, baths, floor area, and lot size.
If any of the values are empty, ignore that feature in the description.
If bedrooms is 0, describe it as a studio in the description.
Use the list of features below to write a compelling story to a potential buyer as to why they would buy this property.
Select one of the interior or exterior features and explain its benefits in a single sentence.
Highlight the unique features early in the description.
`;

const generateAction = async (req, res) => {
  try {
    const prompt =
      req.body.propertyType === "vacant land"
        ? `
    ${basePromptPrefix}
    In the end, include why you'd want to live in the ${req.body.neighborhood} neighborhood of ${req.body.cityState}, such as any notable landmarks nearby or highlights of the community.
    Address: ${req.body.address}
    Property Type: ${req.body.propertyType}
    Lot Size: ${req.body.lotSize}
    Vacant Land Features: ${req.body.landFeatures}
    Unique Features: ${req.body.uniqueFeatures}
  `
        : `
    ${basePromptPrefix}
    In the end, include why you'd want to live in the ${req.body.neighborhood} neighborhood of ${req.body.cityState}, such as any notable landmarks nearby, walkability, or highlights of the community.
    Address: ${req.body.address}
    Property Type: ${req.body.propertyType}
    Bedrooms: ${req.body.bedrooms}
    Baths: ${req.body.baths}
    Parking: ${req.body.parking}
    Year Built: ${req.body.yearBuilt}
    Floor Area: ${req.body.floorArea}
    Lot Size: ${req.body.lotSize}
    Interior Features: ${req.body.interiorFeatures}
    Exterior Features: ${req.body.exteriorFeatures}
    Unique Features: ${req.body.uniqueFeatures}
  `;

    const baseCompletion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}\n`,
      temperature: req.body.apiTemperature,
      max_tokens: 1500,
    });

    const basePromptOutput = baseCompletion.data.choices.pop();

    res.status(200).json({ output: basePromptOutput });
  } catch (error) {
    if (error.status === 504) {
      return res.status(504).json({ error: "Gateway Timeout" });
    } else {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export default generateAction;
