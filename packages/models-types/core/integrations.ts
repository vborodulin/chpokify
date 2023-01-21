export enum INTEGRATIONS_ID {
  JIRA = 'jira'
}

export const JQL_MAX_LENGTH = 2000;

export type TJiraIntegration = {
  baseUrl: string;
  accessToken: string;
  accessTokenSecret: string;
};

export type TJiraApplicationLink = {
  applicationUrl: string;
  applicationName: string;
  consumerKey: string;
  consumerName: string;
  publicKey: string;
  consumerCallbackUrl: string;
}

export type TJiraBoardLocation = {
  projectId: string
  displayName: string;
  projectName: string;
  projectKey: string;
};

export type TJiraBoard = {
  id: string;
  location: TJiraBoardLocation;
  name: string;
  self: string
  type: string;
}

export type TJiraProject = {
  expand: string;
  self: string;
  id: string;
  key: string;
  name: string;
  avatarUrls: Record<string, string>;
  projectTypeKey: string;
  simplified: boolean;
  style: string;
  isPrivate: boolean;
  properties: Record<any, any>;
  entityId: string
  uuid: string

};
export type TJiraSprint = {
  id: string;
  self: string;
  state: string;
  name: string;
  originBoardId: string;
};

export type TJiraIssue = {
  expand: string;
  fields: {
    summary: string;
    description: string;
  }
  id: string;
  key: string;
  self: string;
}
export type TJiraField = {
  id: string;
  key: string;
  name: string;
  custom: boolean,
  orderable: boolean,
  navigable: boolean,
  searchable: boolean,
  clauseNames: string[],
  untranslatedName?: string,
  scope?: {
    type: string,
    project: {
      id: string
    }
  },
  schema?: {
    type: string,
    system?: string,
    custom?: string
    customId?: number
  }
}

// api

export type TJiraApiGetAllBoardsResp = {
  isLast: true
  maxResults: number;
  startAt: number;
  total: number;
  values: TJiraBoard[];
};

export type TJiraApiGetAllSprintsResp = {
  maxResults: number,
  startAt: number;
  isLast: boolean;
  values: TJiraSprint[];
};

export type TJiraApiSearchResp = {
  expand: string;
  issues: TJiraIssue[];
  maxResults: number;
  startAt: number,
  total: number
}
