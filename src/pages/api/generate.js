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
Use the list of features below to write a compelling story to a potential buyer as to why they would buy this property.
Explain the benefits of the features listed below.
If any of the values are 0 or empty ignore that feature in the description.
Highlight the unique features early in the description.
In the end, include why you'd want to live in the neighborhood provided below, such as any notable landmarks nearby or if it's walkable.
`;

const generateAction = async (req, res) => {
  try {
    const prompt =
      req.body.propertyType === "vacant land"
        ? `
    ${basePromptPrefix}
    Address: ${req.body.address}
    Neighborhood: ${req.body.neighborhood}
    Property Type: ${req.body.propertyType}
    Lot Size: ${req.body.lotSize}
    Vacant Land Features: ${req.body.landFeatures}
    Unique Features: ${req.body.uniqueFeatures}
  `
        : `
    ${basePromptPrefix}
    Address: ${req.body.address}
    Neighborhood: ${req.body.neighborhood}
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
      temperature: 0.5,
      max_tokens: 1500,
    });

    const basePromptOutput = baseCompletion.data.choices.pop();

    res.status(200).json({ output: basePromptOutput });
  } catch (error) {
    // TODO Return token if an error occurs
    // await updateCustomerByStripeCid(stripeCustomerId, {
    //   tokens: cust.tokens + 1,
    // });

    if (error.status === 504) {
      return res.status(504).json({ error: "Gateway Timeout" });
    } else {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export default generateAction;
