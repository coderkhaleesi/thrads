<script>
	let messages = [];
	let inputMessage = "";
	let isLoading = false;

	async function sendMessage() {
		if (inputMessage.trim()) {
			messages = [...messages, { text: inputMessage, sender: "user" }];
			const userMessage = inputMessage;
			inputMessage = "";
			isLoading = true;

			try {
				const response = await fetch("/api/chat", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ message: userMessage }),
				});

				if (!response.ok) {
					throw new Error("Network response was not ok");
				}

				const data = await response.json();
				messages = [...messages, { text: data.output, sender: "bot", ad: data.ad }];
			} catch (error) {
				console.error("Error:", error);
				messages = [...messages, { text: "Sorry, there was an error processing your request.", sender: "bot" }];
			} finally {
				isLoading = false;
			}
		}
	}
</script>

<main class="max-w-5xl min-h-screen flex flex-col items-center justify-center p-4 mx-auto">
	<div
		class=" bg-gradient-radial from-accent/30 rounded-full to-background blur-xl flex flex-col items-center justify-center -z-10 p-4 absolute top-0 left-0 w-1/2 h-1/2">
	</div>
	<div
		class=" bg-gradient-radial rounded-full from-secondary/30 to-background blur-xl flex flex-col items-center justify-center -z-10 p-4 absolute top-70 right-0 w-1/2 h-1/2">
	</div>
	<div>
		<nav class="w-full mt-4 fixed top-0 left-0 z-40">
			<div class="max-w-3xl px-4 py-3 rounded-full mx-auto flex justify-between items-center border border-border bg-background/80 backdrop-blur-sm">
				<div class="flex items-center space-x-2">
					<div class="w-8 h-8 bg-primary rounded-full">
						<img src="/logo.png" alt="Thrads" class="w-full h-full object-cover rounded-full" />
					</div>
					<span class="text-xl text-primary">Thrads</span>
				</div>
				<div class="hidden md:flex space-x-6">
					<a href="#" class="text-foreground hover:text-secondary">Product</a>
					<a href="#" class="text-foreground hover:text-secondary">Solutions</a>
					<a href="#" class="text-foreground hover:text-secondary">Company</a>
					<a href="#" class="text-foreground hover:text-secondary">Pricing</a>
				</div>
				<button class="bg-primary text-primary-foreground px-4 py-2 rounded-full hover:bg-primary/90 transition duration-200">
					Start Free Trial
				</button>
			</div>
		</nav>

		<!-- Pill Promo -->
		<header class="relative text-primary-foreground text-6xl p-24 my-12 text-center">
			<div class="bg-card border border-border text-card-foreground px-4 py-2 rounded-full text-sm inline-block mb-8">
				<a href="#chat" class="hover:underline">🚀 New Feature: AI-Powered Ad Generation →</a>
			</div>
			<h1 class="bg-clip-text text-transparent bg-gradient-to-r text-6xl p-8 from-primary to-secondary" style="font-family: 'Poetsen One', sans-serif;">Thrads Chatbot Advertising</h1>
			<p class="text-3xl mt-2 text-foreground">The future of communication is here, be there!</p>
		</header>

		<!-- Chat Area -->
		<div class="max-w-4xl border border-border w-full bg-card rounded-lg shadow-2xl overflow-hidden mx-auto">
			<header class="bg-muted/50 text-card-foreground p-4 text-left">
				<div class="flex items-center space-x-3">
					<img src="/logo.png" alt="ThradsGPT Logo" class="w-14 h-14 rounded-full object-cover" />
					<div class="flex flex-col">
						<h1 class="text-3xl" style="font-family: 'Poetsen One', sans-serif;">ThradsGPT</h1>
						<p class="text-sm text-muted-foreground mt-2">See it in action!</p>
					</div>
				</div>
			</header>

			<div id="chat" class="h-96 overflow-y-auto p-4 bg-background">
				{#each messages as message}
					<div class={`mb-4 ${message.sender === "user" ? "text-right" : "text-left"}`}>
						<span
							class={`inline-block p-2 rounded-lg ${message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
							{message.text}
						</span>
						{#if message.ad}
							<div class="mt-1 text-xs text-muted-foreground bg-transparent p-2 rounded">
								<a href={message.ad.url} target="_blank" rel="noopener noreferrer" class="hover:underline">
									Sponsored Ad: {message.ad.copy}
								</a>
							</div>
						{/if}
					</div>
				{/each}
				{#if isLoading}
					<div class="text-center">
						<span class="inline-block p-2 rounded-lg bg-muted text-muted-foreground">Loading...</span>
					</div>
				{/if}
			</div>

			<div class="p-4 bg-background">
				<form on:submit|preventDefault={sendMessage} class="flex">
					<input
						type="text"
						bind:value={inputMessage}
						placeholder="Type your message..."
						class="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-ring"
						disabled={isLoading} />
					<button
						type="submit"
						class="bg-primary text-primary-foreground px-4 py-2 rounded-r-lg hover:bg-primary/90 transition duration-200"
						disabled={isLoading}>
						Send
					</button>
				</form>
			</div>
		</div>

		<footer class="mt-8 text-center text-primary-foreground">
			<p class="text-sm">&copy; 2024 Thrads. All rights reserved.</p>
			<div class="mt-4 space-x-4">
				<a href="#" class="text-primary-foreground hover:text-muted-foreground transition duration-200">About</a>
				<a href="#" class="text-primary-foreground hover:text-muted-foreground transition duration-200">Features</a>
				<a href="#" class="text-primary-foreground hover:text-muted-foreground transition duration-200">Pricing</a>
				<a href="#" class="text-primary-foreground hover:text-muted-foreground transition duration-200">Contact</a>
			</div>
		</footer>
	</div>
</main>
