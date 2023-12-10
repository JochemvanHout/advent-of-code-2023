export const readFromFile = async (day: number, debug?: boolean): Promise<string> => {
  const filePath = `./solutions/${day}/input${debug ? '_debug' : ''}.txt`;
  const fileContent = await Deno.readTextFile(filePath);

  return fileContent;
}