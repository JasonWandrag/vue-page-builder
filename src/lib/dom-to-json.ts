function* componentIdGenerator() {
  let index = 0
  while (true) {
    yield index++
  }
}
const generator = componentIdGenerator()
const createElement = (tagName: string, options: any) => {
  return {
    contentType: 'element',
    tagName,
    ...options,
    componentID:
      options.attributes.find((attribute: any) => attribute.attributeName === 'componentid')
        ?.attributeValue || generator.next().value
  }
}
const createText = (tagText: string) => {
  return { contentType: 'text', tagText }
}
const createAttribute = (
  attributeName: string,
  attributeValue: boolean | string | number = true
) => {
  return { attributeName, attributeValue }
}
function hasTextChild(element: Element) {
  for (let i = 0; i < element.childNodes.length; i++) {
    const child = element.childNodes[i]
    if (
      child.nodeType === Node.TEXT_NODE &&
      child.textContent &&
      child.textContent.trim().length > 0
    ) {
      return true
    }
  }
  return false
}
export const createMarkdownForElement = (tagName: string, element: Element) => {
  const children: any[] = element.children.length
    ? Array.from(element.children).map((child: Element) =>
        createMarkdownForElement(child.tagName.toLowerCase(), child)
      )
    : []
  const attributes = element.attributes?.length
    ? Array.from(element.attributes)
        .map((attribute) => {
          if (attribute.name === 'contenteditable') return
          return createAttribute(attribute.name, attribute.value)
        })
        .filter((attribute) => attribute)
    : []
  if (hasTextChild(element) && element.textContent) children.push(createText(element.textContent))
  return createElement(tagName, { children, attributes })
}
