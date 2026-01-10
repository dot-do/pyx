/**
 * Virtual Environment Abstraction for Pyodide
 *
 * This module provides a virtual environment abstraction for managing
 * Python packages in Pyodide environments.
 *
 * TODO: Implement VirtualEnv class
 */

export interface InstalledPackage {
  name: string
  version: string
  installedAt: Date
  source?: string
  dependencyOf?: string[]
  wheelTag?: string
}

export interface VirtualEnvOptions {
  name?: string
  pythonVersion?: string
  onWarning?: (message: string) => void
  strictPyodideCompatibility?: boolean
}

export interface VirtualEnvState {
  name: string
  packages: InstalledPackage[]
  exportedAt: Date
}

export interface InstallOptions {
  source?: string
  resolveDependencies?: boolean
  wheelUrl?: string
}

export interface ImportOptions {
  format?: 'json' | 'requirements'
  replace?: boolean
}

export interface ExportOptions {
  format?: 'json' | 'requirements'
}

// Stub class - tests should fail until this is implemented
export class VirtualEnv {
  constructor(_options?: VirtualEnvOptions) {
    throw new Error('VirtualEnv not implemented')
  }

  get id(): string {
    throw new Error('Not implemented')
  }

  get name(): string {
    throw new Error('Not implemented')
  }

  get pythonVersion(): string {
    throw new Error('Not implemented')
  }

  async install(
    _pkg: string,
    _version?: string,
    _options?: InstallOptions
  ): Promise<void> {
    throw new Error('Not implemented')
  }

  async uninstall(_pkg: string): Promise<void> {
    throw new Error('Not implemented')
  }

  list(): InstalledPackage[] {
    throw new Error('Not implemented')
  }

  isInstalled(_pkg: string): boolean {
    throw new Error('Not implemented')
  }

  getVersion(_pkg: string): string | null {
    throw new Error('Not implemented')
  }

  isPyodideCompatible(_pkg: string, _version?: string): boolean {
    throw new Error('Not implemented')
  }

  isWheelCompatible(_wheelFilename: string): boolean {
    throw new Error('Not implemented')
  }

  clone(): VirtualEnv {
    throw new Error('Not implemented')
  }

  export(_options?: ExportOptions): VirtualEnvState | string {
    throw new Error('Not implemented')
  }

  async import(
    _state: VirtualEnvState | string,
    _options?: ImportOptions
  ): Promise<void> {
    throw new Error('Not implemented')
  }

  static async fromState(_state: VirtualEnvState): Promise<VirtualEnv> {
    throw new Error('Not implemented')
  }
}
