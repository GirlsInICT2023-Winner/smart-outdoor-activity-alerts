package playground.playgroundserver.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import playground.playgroundserver.DTO.PlaygroundDTO;
import playground.playgroundserver.Service.PlaygroundService;
import playground.playgroundserver.Util.BaseResponse;

@Controller
@RequestMapping(value = "/api")
public class PlaygroundController {

    private PlaygroundService playgroundService;

    public PlaygroundController(PlaygroundService playgroundService){
        this.playgroundService = playgroundService;
    }

    @ResponseBody
    @GetMapping("/playground")
    public BaseResponse<PlaygroundDTO.PlaygroundInfo> getInfo(){
        return new BaseResponse<>(playgroundService.getplayground());
    }
}
