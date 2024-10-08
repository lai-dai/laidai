import React, { forwardRef } from 'react'
import NextLink, { type LinkProps as NextLinkProps } from 'next/link'

import { cn } from '@/lib/utils'

export interface LinkProps extends Omit<NextLinkProps, 'href'> {
  href?: string
  className?: string
  children?: React.ReactNode
}

export const Link = forwardRef(function Link({
  className,
  href,
  ...props
}: LinkProps) {
  const internalLink = href?.toString().startsWith('/')
  const internalHash = href?.toString().startsWith('#')
  const isInternal = internalLink || internalHash
  const externalLinkProps = !isInternal
    ? { target: '_blank', rel: 'noreferrer' }
    : undefined

  const Anchor = !isInternal ? 'a' : NextLink

  return (
    <Anchor
      className={cn(
        // ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md
        'text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground',
        className
      )}
      // @ts-ignore FIXME: Url only works in NextLink
      href={href}
      {...externalLinkProps}
      {...props}
    />
  )
})
