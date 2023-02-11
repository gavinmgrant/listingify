import { openAIStream } from "util/openaistream";

export const config = {
  runtime: "edge",
};

const generateAction = async (req, res) => {
  const {
    apiTemperature,
    address,
    cityState,
    neighborhood,
    propertyType,
    bedrooms,
    baths,
    parking,
    yearBuilt,
    floorArea,
    lotSize,
    interiorFeatures,
    exteriorFeatures,
    landFeatures,
    uniqueFeatures,
    highlightedFeature,
  } = await req.json();

  const prompt =
    propertyType === "vacant land"
      ? `
      Write a three paragraph real estate listing description for vacant land using the structure explained below.
      The first paragraph will start with an opening statement that will encourage people to keep reading and reference these details of the property:
      Address: ${address}
      Lot Size: ${lotSize}
      The second paragraph will describe in detail why a buy would want the following land features:
      Vacant Land Features: ${landFeatures}
      Unique Features: ${uniqueFeatures}
      Write about why a landowner would want this one vacant land feature: ${highlightedFeature}
      The third paragraph will explain why you'd want to live in the ${neighborhood} neighborhood of ${cityState}, such as any notable landmarks nearby or highlights of the community.
    `
      : `
      Write a three paragraph residential real estate listing description using the structure explained below.
      The first paragraph will start with an opening statement that will encourage people to keep reading and reference these details of the property:
      Address: ${address}
      Property Type: ${propertyType}
      Bedrooms: ${bedrooms}
      Baths: ${baths}
      Parking: ${parking}
      Year Built: ${yearBuilt}
      Floor Area: ${floorArea}
      Lot Size: ${lotSize}
      The second paragraph will describe in detail why a buy would want the following land features:
      Interior Features: ${interiorFeatures}
      Exterior Features: ${exteriorFeatures}
      Unique Features: ${uniqueFeatures}
      Write about why a homeowner would want this one feature in a home: ${highlightedFeature}
      The third paragraph will explain why you'd want to live in the ${neighborhood} neighborhood of ${cityState}, such as any notable landmarks nearby, walkability, or highlights of the community.
    `;

  try {
    const payload = {
      model: "text-davinci-003",
      prompt,
      temperature: apiTemperature,
      max_tokens: 1500,
      stream: true,
    };
    const stream = await openAIStream(payload);
    return new Response(stream);
  } catch (error) {
    if (error.status === 504) {
      return res.status(504).json({ error: "Gateway Timeout" });
    } else {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export default generateAction;
