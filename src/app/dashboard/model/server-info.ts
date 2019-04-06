export interface Projects {
    href: string;
}

export interface VcsRoots {
    href: string;
}

export interface Builds {
    href: string;
}

export interface Users {
    href: string;
}

export interface UserGroups {
    href: string;
}

export interface Agents {
    href: string;
}

export interface BuildQueue {
    href: string;
}

export interface AgentPools {
    href: string;
}

export interface Investigations {
    href: string;
}

export interface Mutes {
    href: string;
}

export interface ServerInfo {
    version: string;
    versionMajor: number;
    versionMinor: number;
    startTime: string;
    currentTime: string;
    buildNumber: string;
    buildDate: string;
    internalId: string;
    webUrl: string;
    projects: Projects;
    vcsRoots: VcsRoots;
    builds: Builds;
    users: Users;
    userGroups: UserGroups;
    agents: Agents;
    buildQueue: BuildQueue;
    agentPools: AgentPools;
    investigations: Investigations;
    mutes: Mutes;
}
