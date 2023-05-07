package playground.playgroundserver.DTO;

import lombok.*;

@Getter
@Setter
public class PlaygroundDTO {

    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    @Setter
    public static class PlaygroundInfo{
        private String name;
        private String loc;
        private Double lat;
        private Double lng;
        private Double dust;
        private Double ultradust;
        private String level;
        private Double air;
        private Double temperature;
        private Double humidity;
    }
}
