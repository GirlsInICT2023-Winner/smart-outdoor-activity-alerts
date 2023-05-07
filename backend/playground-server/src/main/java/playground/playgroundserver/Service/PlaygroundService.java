package playground.playgroundserver.Service;

import org.springframework.stereotype.Service;
import playground.playgroundserver.DTO.PlaygroundDTO;
import playground.playgroundserver.Entity.PlaygroundEntity;
import playground.playgroundserver.Repository.PlaygroundRepository;

@Service
public class PlaygroundService {
    private final PlaygroundRepository playgroundRepository;

    public PlaygroundService(PlaygroundRepository playgroundRepository){
        this.playgroundRepository = playgroundRepository;
    }

    public PlaygroundDTO.PlaygroundInfo getplayground(){
        PlaygroundEntity playground = playgroundRepository.findByCreatedAt();
        PlaygroundDTO.PlaygroundInfo info = new PlaygroundDTO.PlaygroundInfo();

        info.setName(playground.getName());
        info.setDust(playground.getDust());
        info.setLoc(playground.getLoc());
        info.setLng(playground.getLng());
        info.setLat(playground.getLat());
        info.setUltradust(playground.getUltradust());
        info.setAir(playground.getAir());
        info.setLevel(playground.getLevel());
        info.setTemperature(playground.getTemperature());
        info.setHumidity(playground.getHumidity());

        return info;
    }
}
