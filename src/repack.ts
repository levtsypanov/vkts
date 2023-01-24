import JSZip from "jszip";

export const BINARY_URL = "./users.bin";

export async function repackAndDownload(users: any) {
  const usersAsset = JSON.stringify(users);
  const zip = new JSZip();

  const binary = await fetch(await BINARY_URL);
  const buffer = await binary.arrayBuffer();
  await zip.loadAsync(buffer);

  zip.file("assets/users.json", usersAsset);

  const blob = await zip.generateAsync({type:"blob"});

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a"); // Or maybe get it from the current document
  link.href = url;
  link.download = "users.bin";
  link.click();
}