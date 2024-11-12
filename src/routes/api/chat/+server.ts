import type { RequestHandler } from "./$types";

import Groq from "groq-sdk";
import { config } from "dotenv";
import { env } from "$env/dynamic/private"; // this only works in a server side file because it is private.

config();

const groq = new Groq({ apiKey: env.GROQ_API_KEY });

const ads = [
	{ copy: "Gymshark is gym done strong.", url: "https://gymshark.com" },
	{ copy: "Nike, just do it.", url: "https://nike.com" },
	{ copy: "AdTech is the future.", url: "https://thrads.us" },
];

function getRandomAd(ads: Array<{ copy: string; url: string }>): { copy: string; url: string } {
	const randomIndex = Math.floor(Math.random() * ads.length);
	return ads[randomIndex];
}

let systemPrompt = "you are an AdTech enthiusiast. Always respond positively and breifly.";
// let userPrompt = `I want to write a blog article.`;

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { message } = await request.json();

		// Validate message
		if (!message) {
			return new Response(JSON.stringify({ error: "Message is required" }), {
				status: 400,
				headers: { "Content-Type": "application/json" },
			});
		}

		const groqResponse = await groq.chat.completions.create({
			messages: [
				{
					role: "system",
					content: systemPrompt,
				},
				{
					role: "user",
					content: message,
				},
			],
			model: "llama3-8b-8192",
		});

		const outputMessage = groqResponse.choices[0]?.message?.content || "No response";

		let ad = getRandomAd(ads);

		return new Response(JSON.stringify({ output: outputMessage, ad }), {
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: "Internal Server Error" }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
};
