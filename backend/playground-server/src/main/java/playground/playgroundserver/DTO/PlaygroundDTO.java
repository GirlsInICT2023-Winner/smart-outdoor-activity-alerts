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
        private float dust;
        private float ultradust;
        private String level;
        private int air;
        private float temperature;
        private float humidity;
    }
}
