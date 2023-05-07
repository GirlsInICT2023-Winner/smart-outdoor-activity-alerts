package playground.playgroundserver.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import playground.playgroundserver.Entity.PlaygroundEntity;

@Repository
public interface PlaygroundRepository extends JpaRepository<PlaygroundEntity, Long> {

    @Query(value="select * from sensor order by createdAt desc limit 1", nativeQuery = true)
    PlaygroundEntity findByCreatedAt();
}
