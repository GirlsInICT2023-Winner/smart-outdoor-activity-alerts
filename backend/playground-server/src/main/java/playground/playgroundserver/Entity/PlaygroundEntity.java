package playground.playgroundserver.Entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@Table(name = "playground")
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
    private Double dust;

    @Column(name = "pir")
    private String pir;

    @Column(name = "ultradust")
    private Double ultradust;

    @Column(name = "level")
    private String level;

    @Column(name = "air")
    private Double air;

    @Column(name = "createdAt")
    private String createdAt;

    @Column(name = "temperature")
    private Double temperature;

    @Column(name = "humidity")
    private Double humidity;

    @Builder
    public PlaygroundEntity(long idx, String name, String loc,
                            Double lat, Double lng, Double dust,
                            String pir, Double ultradust, String level,
                            Double air, String createdAt,
                            Double temperature, Double humidity){
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
