import { Button } from "@/components/ui/button";
import React from "react";

export default function HomePage() {
	// simulate  slow loading
	new Promise((resolve) => setTimeout(resolve, 4000));
	return <Button>Home Page</Button>;
}
