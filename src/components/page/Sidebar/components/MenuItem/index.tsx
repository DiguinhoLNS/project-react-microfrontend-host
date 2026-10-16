'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar'
import isActiveLink from '@/utils/isActiveLink'
import type { ISidebarLink } from '../../interfaces/ISidebarLink'

interface SidebarLinkItemProps extends ISidebarLink {
    badge?: number | null
}

export default function SidebarLinkItem({ link, icon: Icon, label, badge }: SidebarLinkItemProps) {

    const pathName = usePathname()
    const { isMobile, setOpenMobile } = useSidebar()

    const isActive = isActiveLink(pathName, link)

    return (

        <>
            <SidebarMenuItem>
                <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    tooltip={label}
                >
                    <Link
                        href={link}
                        onClick={() => isMobile && setOpenMobile(false)}
                    >
                        <Icon />
                        <span>{label}</span>
                    </Link>
                </SidebarMenuButton>

                {typeof badge === 'number' && (
                    <SidebarMenuBadge>{badge}</SidebarMenuBadge>
                )}
            </SidebarMenuItem>
        </>

    )

}
