import {CommentIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'comment',
  type: 'document',
  title: 'Comment',
  icon: CommentIcon,
  fields: [
    defineField({
      name: 'status',
      type: 'string',
      initialValue: 'pending',
      options: {
        list: ['pending', 'approved', 'spam'],
      },
    }),
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({name: 'email', type: 'string'}),
    defineField({name: 'comment', type: 'text'}),
    defineField({name: 'post', type: 'reference', to: [{type: 'post'}]}),
    defineField({
      name: 'replies',
      type: 'array',
      of: [{type: 'reply'}],
    }),
  ],
  preview: {
    select: {
      name: 'name',
      comment: 'comment',
      post: 'post.title',
    },
    prepare({name, comment, post}) {
      return {
        title: `${name} on ${post}`,
        subtitle: comment,
      }
    },
  },
})
