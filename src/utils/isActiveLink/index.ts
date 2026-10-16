export default function isActiveLink(pathName: string, link: string) {
    if (link === '/') return pathName === '/'

    return pathName === link || pathName.startsWith(`${link}/`)
}
