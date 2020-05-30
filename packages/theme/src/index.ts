interface Index {
  name: string;
}

export const getName = function (obj: Index): string {
  return obj.name;
};
