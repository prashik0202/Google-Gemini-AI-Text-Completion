"use client";
import { useCompletion } from "ai/react";
import aicon from "../../google-gemini-icon.svg";
import Image from "next/image";

import Welcome from "@/components/Welcome";
import CopyClipboard from "@/components/CopyClipboard";
import { Button } from "@/components/ui/button";
import { SendHorizonal } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Chat() {
  // async function callGeminiApi(prompt: string) {
  //   setLoading(true);
  //   try {
  //     const response = await fetch("/api/chat", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ prompt }),
  //     });

  //     // setLoading(true);

  //     if (!response.ok) {
  //       throw new Error("Opps error occured" + response.statusText);
  //     }

  //     const text = await response.text();
  //     return text;
  //   } catch (error) {
  //     console.error("There was a problem with the fetch operation:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  // const [prompt, setPrompt] = useState<string>("");
  // const [response, setResponse] = useState<string>("");
  // const [Loading, setLoading] = useState(false);

  // const handleSubmit = async (e: FormEvent) => {
  //   e.preventDefault();
  //   const apiResponse = await callGeminiApi(prompt);
  //   if (apiResponse !== undefined) {
  //     setPrompt("");
  //     setResponse(apiResponse);
  //   }
  // };

  const {
    completion,
    input,
    stop,
    isLoading,
    handleInputChange,
    handleSubmit,
  } = useCompletion({
    api: "/api/completion",
  });

  return (
    <div className="h-full flex-col py-20 w-full lg:w-1/2 lg:mx-auto items-center">
      <form
        onSubmit={handleSubmit}
        className="w-full flex gap-x-1 items-center justify-center"
      >
        <Input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Enter your prompt"
          className="w-full outline-none shadow-xl h-12 active:border-none  text-l md:text-xl"
        />
        <Button
          type="submit"
          disabled={isLoading}
          variant={"ghost"}
          className="shadow-xl"
        >
          <SendHorizonal className="text-slate-500" />
        </Button>
      </form>

      <div className="h-full mt-10 flex-col">
        {!completion && !isLoading && <Welcome />}
        <output className="text-l md:text-xl whitespace-pre-wrap flex-col gap-y-2 ">
          {completion && (
            <div className="flex justify-start gap-x-2 items-center">
              <Image src={aicon} alt="icon" className="my-4 h-6 w-6" />
              <CopyClipboard text={completion} />
            </div>
          )}
          {completion}
        </output>
      </div>
    </div>
  );
}
