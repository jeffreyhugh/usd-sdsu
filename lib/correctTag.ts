const correctTag = (s: string) => {
  const regex = /(\p{Extended_Pictographic}|\s)/gu;
  return s.match(regex)?.join("\u{200D}")?.substring(0,19) || "";
};

export default correctTag;