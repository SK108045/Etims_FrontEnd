import { Button, Eyebrow } from "@/components/ui";
export default function NotFound() {
  return (
    <div className="not-found container">
      <Eyebrow>OFF THE HAPPY PATH</Eyebrow>
      <h1>404</h1>
      <h2>This route is still uncharted.</h2>
      <p>Let’s get you back to something worth building.</p>
      <Button href="/">Back to PawaTax</Button>
    </div>
  );
}
