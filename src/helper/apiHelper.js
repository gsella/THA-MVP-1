const baseUrl =
  'http://thunderacttextanalyser-prod.eu-west-1.elasticbeanstalk.com/api/';

export const getApiBaseUrl = url => {
  return baseUrl + url;
};
