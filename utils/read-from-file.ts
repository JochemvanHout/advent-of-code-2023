export const readFromFile = async (day: number): Promise<string> => {
  const filePath = `./solutions/${day}/input.txt`;
  const fileContent = await Deno.readTextFile(filePath);

  return fileContent;
}