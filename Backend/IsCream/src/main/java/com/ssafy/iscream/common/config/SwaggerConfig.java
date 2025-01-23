package com.ssafy.iscream.common.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.PathItem;
import io.swagger.v3.oas.models.Paths;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.media.Content;
import io.swagger.v3.oas.models.media.MediaType;
import io.swagger.v3.oas.models.media.Schema;
import io.swagger.v3.oas.models.parameters.RequestBody;
import io.swagger.v3.oas.models.responses.ApiResponse;
import io.swagger.v3.oas.models.responses.ApiResponses;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    OpenAPI openAPI() {
        Info info = new Info().title("API 명세서").description(
                        "<h3>API Reference for Developers</h3>API 명세서")
                .version("v1").contact(new io.swagger.v3.oas.models.info.Contact().name("minchae")
                        .email("minchae075@naver.com").url("http://edu.ssafy.com"));

        // /login 엔드포인트에 대한 설명 추가
        Paths paths = new Paths();
        paths.addPathItem("/login", new PathItem()
                .post(new io.swagger.v3.oas.models.Operation()
                        .summary("로그인")
                        .addTagsItem("users")
                        .requestBody(new RequestBody()
                                .content(new Content().addMediaType("application/json", new MediaType()
                                        .schema(new Schema<>().type("object")
                                                .addProperty("email", new Schema<String>().type("string").example("test@naver.com"))
                                                .addProperty("password", new Schema<String>().type("string").example("1234"))
                                        )))
                                .required(true)
                        )
                        .responses(new ApiResponses()
                                .addApiResponse("200", new ApiResponse().description("로그인 성공").content(new Content().addMediaType("application/json", new MediaType().schema(new Schema<String>().type("string")))))
                                .addApiResponse("401", new ApiResponse().description("인증 실패"))
                        )
                ));

        paths.addPathItem("/logout", new PathItem()
                .post(new io.swagger.v3.oas.models.Operation()
                        .summary("로그아웃")
                        .addTagsItem("users")
                        .responses(new ApiResponses()
                                .addApiResponse("200", new ApiResponse().description("로그아웃 성공").content(new Content().addMediaType("application/json", new MediaType().schema(new Schema<String>().type("string")))))
                                .addApiResponse("401", new ApiResponse().description("인증 실패"))
                        )
                ));

        String key = "x-access-token";  // 헤더 이름을 "access"로 사용

        // JWT 인증 설정
        SecurityRequirement securityRequirement = new SecurityRequirement()
                .addList(key);

        SecurityScheme accessTokenSecurityScheme = new SecurityScheme()
                .type(SecurityScheme.Type.APIKEY)  // 인증 방식으로 APIKEY를 사용
                .in(SecurityScheme.In.HEADER)      // 헤더에 위치
                .name(key);  // 헤더 이름을 "x-access-token"로 설정

        Components components = new Components()
                .addSecuritySchemes(key, accessTokenSecurityScheme);

        return new OpenAPI().components(new Components()).info(info).paths(paths)
                .addSecurityItem(securityRequirement)
                .components(components);
    }

    @Bean
    GroupedOpenApi testApi() {
        return GroupedOpenApi.builder().group("test").pathsToMatch("/test/**").build();
    }

    @Bean
    GroupedOpenApi allApi() {
        return GroupedOpenApi.builder()
                .group("all") // 그룹 이름 지정
                .pathsToMatch("/test/**", "/board/**")
                .build();
    }
}
