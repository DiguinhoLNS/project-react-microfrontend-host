'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { Blocks } from 'lucide-react'
import {
    Sidebar as SidebarRoot,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail
} from '@/components/ui/sidebar'
import sidebarLinks from './constants/links'
import SidebarLinkItem from './components/MenuItem'

export default function Sidebar() {

    return (

        <>
            <SidebarRoot collapsible='icon'>
                <SidebarHeader>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                size='lg'
                                asChild
                            >
                                <Link href='/'>
                                    <div
                                        className={clsx(
                                            'flex items-center justify-center aspect-square size-8 rounded-lg',
                                            'bg-sidebar-primary text-sidebar-primary-foreground'
                                        )}
                                    >
                                        <Blocks className={clsx('size-4')} />
                                    </div>

                                    <div className={clsx('grid flex-1 text-left text-sm leading-tight')}>
                                        <span className={clsx('truncate font-semibold')}>Microfrontend Host</span>
                                        <span className={clsx('truncate text-xs text-muted-foreground')}>Next.js + shadcn/ui</span>
                                    </div>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>

                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Navegação</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {sidebarLinks.map(item => (
                                    <SidebarLinkItem
                                        key={item.link}
                                        {...item}
                                    />
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>

                <SidebarRail />
            </SidebarRoot>
        </>

    )

}
