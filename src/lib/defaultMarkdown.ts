import { createElement, createText, createAttribute } from './helpers'

const sections = ['landing', 'about', 'projects', 'testimonials', 'skills', 'contact']
// UI Components
export const navbar = createElement('nav', {
  children: [
    createElement('h1', { children: [createText('Lorem Ipsum Company')] }),
    createElement('ul', {
      children: sections.map((section) =>
        createElement('li', {
          children: [
            createElement('a', {
              children: [createText(section)],
              attributes: [
                createAttribute('href', `#${section}`),
                createAttribute(
                  'style',
                  `
                      text-decoration: none;
                      color: inherit;
                      padding: 10px;
                      display: block;
                      text-transform: capitalize;
                    `
                )
              ]
            })
          ]
        })
      ),
      attributes: [
        createAttribute(
          'style',
          `
                  display: flex;
                  list-style-type: none;
                `
        )
      ]
    })
  ],
  attributes: [
    createAttribute(
      'style',
      `
          position: sticky;
          top: 0;
          left: 0;
          right: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: cornflowerblue;
          padding: 1rem 3rem;
          box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        `
    )
  ]
})
export const content = createElement('main', {
  children: sections.map((section, index) =>
    createElement('section', {
      children: [
        createElement('h1', {
          children: [createText(section)],
          attributes: [
            createAttribute('style', `text-transform: uppercase; margin-bottom: 20px`),
            createAttribute('contenteditable')
          ]
        }),
        createElement('p', {
          children: [
            createText(
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et officiis facilis officia, tempora inventore earum provident! Voluptatem minima, repellendus itaque earum dolor omnis eos ipsa unde tempore suscipit rem nobis.'
            )
          ],
          attributes: [
            createAttribute('style', `text-align: center;`),
            createAttribute('contenteditable')
          ]
        })
      ],
      attributes: [
        createAttribute('id', section),
        createAttribute(
          'style',
          `
              min-height: 100vh;
              padding: 10%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              color: ${index % 2 === 0 ? 'cornflowerblue' : '#333'};
              background: ${index % 2 === 0 ? '#333' : 'cornflowerblue'};
            `
        )
      ]
    })
  )
})
export const footer = createElement('footer', {
  children: [createText('Made by Jason')],
  attributes: [
    createAttribute(
      'style',
      `
          position: sticky;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1rem 3rem;
          background: cornflowerblue;
          text-align: center;
          box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        `
    )
  ]
})
