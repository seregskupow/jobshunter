const cleanUrl = (url: string) => {
  return url.replace(/[^?=&]+=(&|$)/g, "").replace(/&$/, "");
};

export default cleanUrl;
