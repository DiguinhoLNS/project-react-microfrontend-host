import { CONTRACT_VERSION } from '../constants/contract'
import type { IRemoteModule } from '../interfaces/IRemoteContract'

export default class RemoteLoaderService {

    private static cache = new Map<string, Promise<IRemoteModule>>()

    public static load(url: string, attempt = 0) {
        const target = this.getTarget(url, attempt)

        let request = this.cache.get(target)

        if (!request) {
            request = import(/* webpackIgnore: true */ target)
                .catch(() => {
                    throw new Error(`Não foi possível baixar o remote em ${url}. Verifique se ele está publicado e com CORS liberado.`)
                })
                .then(module => this.validate(module, url))

            request.catch(() => this.cache.delete(target))

            this.cache.set(target, request)
        }

        return request
    }

    private static getTarget(url: string, attempt: number) {
        if (attempt === 0) return url

        const target = new URL(url)

        target.searchParams.set('retry', String(attempt))

        return target.href
    }

    private static validate(module: unknown, url: string) {
        const remote = module as Partial<IRemoteModule>

        if (typeof remote.mount !== 'function') {
            throw new Error(`O módulo em ${url} não exporta a função "mount".`)
        }

        if (remote.contractVersion !== CONTRACT_VERSION) {
            throw new Error(`Contrato incompatível: o host usa a v${CONTRACT_VERSION} e o remote expõe a v${remote.contractVersion}.`)
        }

        return remote as IRemoteModule
    }

}
