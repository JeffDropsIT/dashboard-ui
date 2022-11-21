import {environment} from '../../../environments/environment';

export class ApiConfiguration {

  public static backend: string = environment.backend;
  public static authEndpoint: string = environment.backend + environment.authServiceEndpoint;
  public static keepAliveEndpoint: string = environment.backend + environment.keepAliveEndpoint;
}
