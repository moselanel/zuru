import { streamText, convertToModelMessages, type UIMessage } from "ai"
import { reserves, accommodations, experiences, attractions } from "@/lib/data"

export const maxDuration = 60

// Create a condensed summary of all available data for the AI
function getDestinationContext() {
  const parksSummary = reserves.map(r => ({
    name: r.name,
    location: r.location,
    region: r.region,
    highlights: r.shortDescription,
    wildlife: r.wildlife?.slice(0, 5).join(", "),
    activities: r.activities?.join(", "),
    priceFrom: r.priceFrom,
    rating: r.rating,
  }))

  const accommodationsSummary = accommodations.map(a => ({
    name: a.name,
    type: a.type,
    reserve: a.reserveName,
    pricePerNight: a.pricePerNight,
    capacity: a.maxCapacity,
    amenities: a.amenities?.slice(0, 5).join(", "),
    rating: a.rating,
  }))

  const experiencesSummary = experiences.map(e => ({
    name: e.name,
    category: e.category,
    duration: e.duration,
    intensity: e.intensity,
    price: e.price,
    rating: e.rating,
    minAge: e.minAge,
  }))

  const attractionsSummary = attractions.map(a => ({
    name: a.name,
    type: a.type,
    location: a.location,
    region: a.region,
    duration: a.duration,
    priceFrom: a.priceFrom,
    accessible: a.accessible,
  }))

  return {
    parks: parksSummary,
    accommodations: accommodationsSummary,
    experiences: experiencesSummary,
    attractions: attractionsSummary,
  }
}

const systemPrompt = `You are an expert travel planner for MTPA (Mpumalanga Tourism and Parks Agency) in South Africa. You help visitors create personalized itineraries to explore Mpumalanga's incredible nature reserves, wildlife, and attractions.

## Your Knowledge Base
You have access to the following destinations and activities:

${JSON.stringify(getDestinationContext(), null, 2)}

## Mpumalanga Regions
- **Panorama Route**: Blyde River Canyon, God's Window, waterfalls, scenic viewpoints
- **Lowveld**: Safari country, Big Five reserves, Kruger National Park area
- **Highveld**: Lakes, dams, trout fishing, grasslands
- **Barberton Valley**: Hot springs, ancient geology, mountain scenery

## Guidelines
1. Always recommend specific parks, accommodations, and experiences from the data provided
2. Consider travel times between locations (Mpumalanga is a large province)
3. Mix activities: game drives, scenic viewpoints, cultural experiences, relaxation
4. Account for the user's budget, group composition, and interests
5. Suggest optimal timing (early mornings for game drives, golden hour for viewpoints)
6. Include practical tips like what to pack, best seasons, malaria precautions in Lowveld
7. Format itineraries clearly with day-by-day breakdown
8. Always mention prices in South African Rand (R)
9. Be enthusiastic but realistic about wildlife sightings

## Response Format
When creating itineraries, use this structure:
- Brief introduction acknowledging the user's preferences
- Day-by-day breakdown with morning, afternoon, and evening activities
- Accommodation recommendations for each night
- Estimated budget breakdown
- Practical tips and recommendations

Be conversational and helpful. Ask clarifying questions if needed about:
- Number of days available
- Budget range
- Interests (wildlife, adventure, relaxation, culture)
- Group composition (families, couples, solo)
- Accessibility needs
- Time of year visiting`

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const result = streamText({
    model: "anthropic/claude-sonnet-4",
    system: systemPrompt,
    messages: await convertToModelMessages(messages),
    temperature: 0.7,
  })

  return result.toUIMessageStreamResponse()
}
