import runChat from "./gemini";

export const onSent = async (prompt) => {
    const result = await runChat(prompt);
    // console.log("Result is : " ,result);
    const res = result.candidates[0]?.content?.parts[0]?.text;
    // console.log(res);
    return res;
}