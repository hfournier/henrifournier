import {defineType, defineArrayMember} from 'sanity'
import {CodeIcon, EarthGlobeIcon, LinkIcon} from '@sanity/icons'

/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */
export default defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      // Styles let you set what your user can mark up blocks with. These
      // correspond with HTML tags, but you can set any title or value
      // you want and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Numbered', value: 'number'},
      ],
      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
          {title: 'Underline', value: 'underline'},
          {title: 'Strike', value: 'strike-through'},
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'URL',
            icon: EarthGlobeIcon,
            fields: [
              {
                name: 'href',
                title: 'URL',
                type: 'url',
              },
            ],
          },
          {
            name: 'internalLink',
            type: 'object',
            title: 'Internal link',
            icon: LinkIcon,
            fields: [
              {
                name: 'reference',
                title: 'Reference',
                type: 'reference',
                to: [
                  {type: 'post'},
                  // other types you may want to link to
                ],
              },
            ],
          },
          {
            name: 'inlinecode',
            type: 'object',
            title: 'Inline Code',
            icon: CodeIcon,
            fields: [
              {
                name: 'language',
                title: 'Language',
                type: 'string',
                initialValue: 'html',
                options: {
                  list: [
                    {title: 'Typescript', value: 'typescript'},
                    {title: 'Javascript', value: 'javascript'},
                    {title: 'HTML', value: 'html'},
                    {title: 'CSS', value: 'css'},
                    {title: 'JSON', value: 'json'},
                    {title: 'MarkDown', value: 'markdown'},
                    {title: 'GROQ', value: 'groq'},
                    {title: 'XML', value: 'xml'},
                    {title: 'C#', value: 'csharp'},
                    {title: 'SQL', value: 'sql'},
                  ],
                },
              },
            ],
          },
        ],
      },
    }),
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    defineArrayMember({
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineArrayMember({
      title: 'Code',
      type: 'code',
      options: {
        language: 'html',
        languageAlternatives: [
          {title: 'Typescript', value: 'typescript'},
          {title: 'Javascript', value: 'javascript'},
          {title: 'HTML', value: 'html'},
          {title: 'CSS', value: 'css'},
          {title: 'JSON', value: 'json'},
          {title: 'MarkDown', value: 'markdown'},
          {title: 'GROQ', value: 'groq'},
          {title: 'XML', value: 'xml'},
          {title: 'C#', value: 'csharp'},
          {title: 'SQL', value: 'sql'},
        ],
      },
    }),
  ],
})
