import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'reply',
  type: 'object',
  title: 'Reply',
  fields: [
    defineField({
      title: 'Approved',
      name: 'approved',
      type: 'boolean',
      initialValue: false,
      description: 'Comments will not be shown without approval',
    }),
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({name: 'email', type: 'string'}),
    defineField({name: 'comment', type: 'text'}),
    defineField({name: 'createdAt', type: 'datetime', initialValue: new Date().toISOString()}),
  ],
})
