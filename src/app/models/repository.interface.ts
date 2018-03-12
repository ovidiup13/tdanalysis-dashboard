export interface Repository {
  id: String;
  name: String;
  author: String;
  uri: String;
  issueTrackerURI?: String;
  buildCommand?: String;
  projectFolder?: String;
}
