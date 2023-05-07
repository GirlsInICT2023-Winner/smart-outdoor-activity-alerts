package playground.playgroundserver.Entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Entity
@Data
@NoArgsConstructor
@Table(name = "sensor")
public class PlaygroundEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idx;

    @Column(name = "name")
    private String name;

    @Column(name = "loc")
    private String loc;

    @Column(name = "lat")
    private Double lat;

    @Column(name = "lng")
    private Double lng;

    @Column(name = "dust")
    private float dust;

    @Column(name = "pir")
    private String pir;

    @Column(name = "ultradust")
    private float ultradust;

    @Column(name = "level")
    private String level;

    @Column(name = "air")
    private int air;

    @Column(name = "createdAt")
    private Timestamp createdAt;

    @Column(name = "temperature")
    private float temperature;

    @Column(name = "humidity")
    private float humidity;

    @Builder
    public PlaygroundEntity(long idx, String name, String loc,
                            Double lat, Double lng, float dust,
                            String pir, float ultradust, String level,
                            int air, Timestamp createdAt,
                            float temperature, float humidity){
        this.idx = idx;
        this.name = name;
        this.loc = loc;
        this.lat = lat;
        this.lng = lng;
        this.dust = dust;
        this.pir = pir;
        this.ultradust = ultradust;
        this.level = level;
        this.air = air;
        this.createdAt = createdAt;
        this.temperature = temperature;
        this.humidity = humidity;
    }
}
