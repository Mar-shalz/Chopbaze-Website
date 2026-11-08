import { createCn } from "cn/config"

// Fluid type utilities (text-fluid-*) are font sizes, not colors; register them so merges keep them.
export const cn = createCn({
  extend: {
    classGroups: {
      "font-size": [{ "text-fluid": ["64", "56", "48", "40", "32", "28", "24", "20", "18", "16"] }],
    },
  },
})
