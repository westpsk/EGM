import React, { useState, useEffect } from "react";
import { render, Box } from "ink";

const BigText = require("ink-big-text");
const pkg = require("../../package.json");

export function showBrand() {
  render(<BigText text={pkg.displayName} />);
}

const cat0 = `
        (\`.
         ) )
        ( (
         \\ \\
          \\ \\
        .-'  \`-.
       /        \`.
      (      )    \`-._ ,    _
       )   ,'         (.\\--'(
       \\  (         ) /      \\
        \\  \\_(     / (    <6 (6
         \\_)))\\   (   \`._  .:Y)__
          '''  \\   \`-._.'\`---^_)))
                \`-._ )))       \`\`\`
                     \`\`\`           EGM
`;

const cat1 = `
          .\`)
         ( (
          ) )
          \\ \\
          \\ \\
        .-'  \`-.
       /        \`.
      (      )    \`-._ ,    _
       )   ,'         (.\\--'(
       \\  (         ) /      \\
        \\  \\_(     / (    <6 (66
         \\_)))\\   (   \`._  .:Y)__
          '''  \\   \`-._.'\`---^_)))
                \`-._ )))       \`\`\`
                     \`\`\`           EGM
`;

const list = [cat0, cat1];

const CurCat = () => {
  const [cur, setCur] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCur((pre) => (pre === 2 ? 0 : pre + 1));
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return <Box>{list[cur]}</Box>;
};

export function showCat() {
  render(<CurCat />);
}
