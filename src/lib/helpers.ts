export const waitForMs = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
function* infinite() {
  let index = 0
  while (true) {
    yield index++
  }
}
export const generator = infinite() // "Generator { }"

export const createElement = (tagName: string, options: any) => {
  let compID = generator.next().value;
  while (document.querySelector(`[componentid='${compID}']`)) {
    compID = generator.next().value;
  }
  return {
    contentType: 'element',
    tagName,
    ...options,
    componentID:
      options?.attributes?.find((attribute) => attribute.attributeName === 'componentid')
        ?.attributeValue || compID
  }
}
export const createText = (tagText) => {
  return { contentType: 'text', tagText }
}
export const createAttribute = (attributeName, attributeValue: any = true) => {
  return { attributeName, attributeValue }
}
export const isFoundObj = (obj, val) => {
  if (obj.componentID == val) {
    return obj
  } else if (obj.contentType == 'element' && obj.children) {
    for (let i = 0; i < obj.children.length; i++) {
      const found = isFoundObj(obj.children[i], val)
      if (found) return found
    }
  }
}
export const createStyleGrouping = (items, selectedID) => {
  const styleable = document.querySelector(`[componentID='${selectedID}']`)
  const commonStyleGroups = [
    'animation',
    'background',
    'border',
    'flex',
    'font',
    'grid',
    'list',
    'margin',
    'outline',
    'overflow',
    'padding',
    'scroll',
    'text',
    'transform',
    'transition'
  ]
  const sizeAttributes = ['height', 'max-height', 'min-height', 'width', 'max-width', 'min-width']
  const positionAttributes = ['position', 'top', 'bottom', 'left', 'right', 'z-index']
  const displayAttributes = ['display', 'box-shadow', 'opacity', 'visibility']
  const flexAndGrid = ['align-', 'justify-']
  const fontExtras = [
    'color',
    'letter-spacing',
    'line-break',
    'line-height',
    'white-space',
    'word-break',
    'word-spacing',
    'writing-mode'
  ]
  const mouse = ['cursor', 'pointer-events']
  const imageExtras = ['object-fit', 'object-position']
  const transformExtras = [
    'perspective',
    'perspective-origin',
    'rotate',
    'scale',
    'translate',
    'zoom'
  ]
  return items.reduce((styleDefinitions, styleAttribute) => {
    const commonGroup = commonStyleGroups.find((group) => styleAttribute.startsWith(group))
    if (commonGroup) {
      if (!styleDefinitions[commonGroup]) styleDefinitions[commonGroup] = {}
      styleDefinitions[commonGroup][styleAttribute] = styleable.style[styleAttribute]
    } else if (sizeAttributes.includes(styleAttribute)) {
      if (!styleDefinitions.size) styleDefinitions.size = {}
      styleDefinitions.size[styleAttribute] = styleable.style[styleAttribute]
    } else if (positionAttributes.includes(styleAttribute)) {
      if (!styleDefinitions.position) styleDefinitions.position = {}
      styleDefinitions.position[styleAttribute] = styleable.style[styleAttribute]
    } else if (displayAttributes.includes(styleAttribute)) {
      if (!styleDefinitions.display) styleDefinitions.display = {}
      styleDefinitions.display[styleAttribute] = styleable.style[styleAttribute]
    } else if (sizeAttributes.includes(styleAttribute)) {
      if (!styleDefinitions.size) styleDefinitions.size = {}
      styleDefinitions.size[styleAttribute] = styleable.style[styleAttribute]
    } else if (flexAndGrid.find((group) => styleAttribute.startsWith(group))) {
      if (!styleDefinitions.flex) styleDefinitions.flex = {}
      if (!styleDefinitions.grid) styleDefinitions.grid = {}
      styleDefinitions.flex[styleAttribute] = styleable.style[styleAttribute]
      styleDefinitions.grid[styleAttribute] = styleable.style[styleAttribute]
    } else if (fontExtras.includes(styleAttribute)) {
      if (!styleDefinitions.font) styleDefinitions.font = {}
      styleDefinitions.font[styleAttribute] = styleable.style[styleAttribute]
    } else if (mouse.includes(styleAttribute)) {
      if (!styleDefinitions.mouse) styleDefinitions.mouse = {}
      styleDefinitions.mouse[styleAttribute] = styleable.style[styleAttribute]
    } else if (imageExtras.includes(styleAttribute)) {
      if (!styleDefinitions.images) styleDefinitions.images = {}
      styleDefinitions.images[styleAttribute] = styleable.style[styleAttribute]
    } else if (transformExtras.includes(styleAttribute)) {
      if (!styleDefinitions.transform) styleDefinitions.transform = {}
      styleDefinitions.transform[styleAttribute] = styleable.style[styleAttribute]
    } else {
      if (!styleDefinitions.other) styleDefinitions.other = {}
      styleDefinitions.other[styleAttribute] = styleable.style[styleAttribute]
    }
    return styleDefinitions
  }, {})
}

export const rgbToHex = (rgbString: string) => {
  // Remove the "rgb(" and ")" characters from the string
  const rgb = rgbString.slice(4, -1)

  // Split the RGB values into an array
  const rgbValues = rgb.split(',')

  // Convert each RGB value to a hexadecimal representation
  const hexValues = rgbValues.map((value) => {
    const decimal = parseInt(value, 10)
    const hex = decimal.toString(16).padStart(2, '0')
    return hex
  })

  // Concatenate the hexadecimal values and prepend "#"
  const hexString = `#${hexValues.join('')}`

  return hexString
}

export const buildElement = ({ tagName, children, attributes, componentID }, parentElement) => {
  const newElement = document.createElement(tagName);
  newElement.setAttribute("componentID", componentID)
  if (attributes) {
      attributes.forEach(({ attributeName, attributeValue }) => {
          newElement.setAttribute(
              attributeName,
              attributeValue ? attributeValue : true
          );
      });
  }
  if (children) {
      children.forEach((child) => {
          buildUI(child, newElement);
      });
  }
  return parentElement.appendChild(newElement);
}
export const buildText = ({ tagText }, parentElement) => {
  const newElement = document.createTextNode(tagText);
  return parentElement.appendChild(newElement);
}
export const buildUI = (element, parentElement) => {
  const { contentType } = element;
  return contentType === "element"
      ? buildElement(element, parentElement)
      : buildText(element, parentElement);
}

// Default Element Constructors
export const createInputUI = (elementMarkdown) => {
  switch (elementMarkdown.variantType) {
    case "text":
      return createElement("input", {
        attributes: [
          createAttribute("type", elementMarkdown.variantType),
          createAttribute("placeholder", elementMarkdown.placeholder),
          createAttribute("name", elementMarkdown.name),
          createAttribute(
            "style",
            `text-align: center; padding: 10px; display: block; width: 100%`
          ),
        ],
      });
    case "email":
      return createElement("input", {
        attributes: [
          createAttribute("type", elementMarkdown.variantType),
          createAttribute("placeholder", elementMarkdown.placeholder),
          createAttribute("name", elementMarkdown.name),
          createAttribute(
            "style",
            `text-align: center; padding: 10px; display: block; width: 100%`
          ),
        ],
      });
    case "checkbox":
      return createElement("label", {
        children: [
          createElement("input", {
            attributes: [
              createAttribute("type", elementMarkdown.variantType),
              createAttribute("value", elementMarkdown.value),
              createAttribute("name", elementMarkdown.name),
              createAttribute(
                "style",
                `text-align: center; padding: 10px; display: block`
              ),
            ],
          }),
          createText(elementMarkdown.value),
        ],
      });
    case "radio":
      return createElement("label", {
        children: [
          createElement("input", {
            attributes: [
              createAttribute("type", elementMarkdown.variantType),
              createAttribute("value", elementMarkdown.value),
              createAttribute("name", elementMarkdown.name),
              createAttribute(
                "style",
                `text-align: center; padding: 10px; display: block`
              ),
            ],
          }),
          createText(elementMarkdown.value),
        ],
      });
    case "range":
      return createElement("input", {
        attributes: [
          createAttribute("type", elementMarkdown.variantType),
          createAttribute("value", elementMarkdown.value),
          createAttribute("min", elementMarkdown.min),
          createAttribute("max", elementMarkdown.max),
          createAttribute("step", elementMarkdown.step),
          createAttribute(
            "style",
            `text-align: center; padding: 10px; display: block`
          ),
        ],
      });
    case "submit":
      return createElement("input", {
        attributes: [
          createAttribute("type", elementMarkdown.variantType),
          createAttribute(
            "style",
            `text-align: center; padding: 10px; display: block`
          ),
        ],
        children: [createText(elementMarkdown.text)],
      });
    case "form":
      return createElement(elementMarkdown.variantType, {
        attributes: [
          createAttribute("action", elementMarkdown.action),
          createAttribute("method", elementMarkdown.method),
          createAttribute(
            "style",
            `text-align: center; padding: 10px; background: rgba(255, 255, 255, 0.3); display: flex; flex-direction: column`
          ),
        ],
      });
  }
};
export const createTextUI = (elementMarkdown) => {
  switch (elementMarkdown.variantType) {
    case "a":
      return createElement(elementMarkdown.variantType, {
        children: [createText(elementMarkdown.text)],
        attributes: [
          createAttribute("href", elementMarkdown.href),
          createAttribute("target", elementMarkdown.target),
          createAttribute("style", `text-align: center; padding: 10px; `),
          createAttribute("contenteditable"),
        ],
      });
    default:
      return createElement(elementMarkdown.variantType, {
        children: [createText(elementMarkdown.text)],
        attributes: [
          createAttribute("style", `text-align: center; padding: 10px; `),
          createAttribute("contenteditable"),
        ],
      });
  }
};
export const createMediaUI = (elementMarkdown) => {
  // if (mediaType === "video") return createElement()
  if (elementMarkdown.variantType === "img")
    return createElement("img", {
      attributes: [
        createAttribute("src", elementMarkdown.src),
        createAttribute("alt", elementMarkdown.alt),
        createAttribute(
          "style",
          `width: 100%; height: 100%; object-fit: cover; object-position: center center;`
        ),
      ],
    });
};

// Handle element creation from the form
export const generateUI = (elementMarkdown) => {
  if (elementMarkdown.elementType === "input")
    return createInputUI(elementMarkdown);
  if (elementMarkdown.elementType === "text")
    return createTextUI(elementMarkdown);
  if (elementMarkdown.elementType === "media")
    return createMediaUI(elementMarkdown);
};
// Handle Section creation from the form
export const generateSection = (sectionMarkdown) => {
  let boxes = [];
  // let amtBoxes = sectionMarkdown.rows * sectionMarkdown.cols

  for (let i = 0; i < sectionMarkdown.cols; i++) {
    boxes.push(
      createElement("div", {
        attributes: [
          createAttribute(
            "style",
            `text-align: center; padding: 10px; background: rgba(255,255,255,0.3); color: #333; width: ${
              sectionMarkdown.direction == "row"
                ? `calc(100% / ${sectionMarkdown.cols})`
                : "100%"
            };`
          ),
        ],
      })
    );
  }
  return createElement("section", {
    children: boxes,
    attributes: [
      createAttribute(
        "style",
        `width: 100%; text-align: center; display: flex; flex-direction: ${sectionMarkdown.direction}; gap: 10px; justify-content: space-between`
      ),
    ],
  });
};

function hasTextChild(element: Element) {
  for (let i = 0; i < element.childNodes.length; i++) {
    const child = element.childNodes[i];
    if (child.nodeType === Node.TEXT_NODE && child.textContent && child.textContent.trim().length > 0) {
      return true;
    }
  }
  return false;
}

export const createMarkdownForElement = (tagName, element) => {
  const children = element.children?.length
    ? Array.from(element.children).map((child) =>
        createMarkdownForElement(child.tagName.toLowerCase(), child)
      )
    : [];
  const attributes = element.attributes?.length
    ? Array.from(element.attributes)
        .map((attribute) => {
          if (attribute.name === "contenteditable") return;
          return createAttribute(attribute.name, attribute.value);
        })
        .filter((attribute) => attribute)
    : [];
  if (hasTextChild(element)) children.push(createText(element.textContent));
  return createElement(tagName, { children, attributes });
};